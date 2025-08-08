# Navamani Gold Covering Website

A responsive, modern landing page for **Navamani Gold Covering** traditional gold covering jewelry.  
Hosted as a static website on **AWS S3** with a contact form backed by **AWS Lambda**, **API Gateway**, and **DynamoDB**.

---

## Features

- Fully responsive landing page with hero image and gallery  
- Interactive lightbox for image previews  
- Contact form with real-time validation and feedback  
- Contact form submissions handled by AWS Lambda function  
- Data stored in DynamoDB table  
- Instagram integration link  
- Modern, accessible UI with smooth animations

---

## Architecture

+--------------+        +----------------+        +-------------+        +-------------+        +--------------+
| User Browser | -----> | Static Website | -----> | API Gateway | -----> | Lambda Func | -----> | DynamoDB DB  |
|              |        |      (S3)      |        |             |        |             |        |              |
+--------------+        +----------------+        +-------------+        +-------------+        +--------------+
       ↑                                                                                              |
       |                                                                                              |
       +----------------------------------------------------------------------------------------------+
                                       Response Success/Error





---

## Setup Instructions

### 1. S3 Static Website Hosting

- Create an S3 bucket (e.g., `navamani-site01`)
- Enable **Static Website Hosting** on the bucket
- Upload the website files (HTML, CSS, JS, images)
- Set bucket policy for public read access to website content

### 2. Upload Images

- Upload all images to the `/images/` folder in the S3 bucket  
- Reference images using their S3 public URLs in your HTML

### 3. DynamoDB Table

- Create a DynamoDB table (e.g., `NavamaniContacts`)  
- Use a string primary key `id`

### 4. AWS Lambda Function

- Create a Lambda function with appropriate permissions to write to DynamoDB  
- Use the provided Lambda handler code to process contact submissions

### 5. API Gateway

- Create an API Gateway HTTP or REST API  
- Create a POST `/contact` endpoint integrated with the Lambda function  
- Enable CORS to allow browser requests from your S3 website domain  
- Deploy the API and note the invoke URL

### 6. Configure Website Contact Form

- Update the contact form fetch URL to your API Gateway endpoint  
- Test sending messages from the website

## Important Notes
Ensure IAM Roles attached to Lambda have DynamoDB write permissions.

Make sure CORS is properly configured on API Gateway to allow your website domain.

Secure your AWS resources; consider validation, throttling, and monitoring.

Customize the styles and images as per your branding needs.

