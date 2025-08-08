import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-south-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log("Incoming event:", event);

    // Default CORS headers
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight OPTIONS request
    if (event.requestContext?.http?.method === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: "CORS preflight OK" })
        };
    }

    try {
        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        const { name, email, phone, message } = body || {};

        if (!name || !email || !phone || !message) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: "All fields (name, email, phone, message) are required." })
            };
        }

        const params = {
            TableName: "NavamaniContactForm",
            Item: {
                id: Date.now().toString(),
                name,
                email,
                phone,
                message,
                timestamp: new Date().toISOString()
            }
        };

        await ddbDocClient.send(new PutCommand(params));

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ success: true, message: "Message stored successfully." })
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
