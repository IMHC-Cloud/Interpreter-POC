import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-east-2"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ 
    region: REGION,
    credentials:{
    accessKeyId:'AKIAQJ2X6THH3W5COIG3',
    secretAccessKey:'32tiHOvDgJy2577WdrHjPafaHMUc7lGAoBrQF/sV'
    }
    
});
export { s3Client };