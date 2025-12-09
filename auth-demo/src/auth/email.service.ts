import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Subject } from "rxjs";

 @Injectable()
 export class EmailService{
    private SENDMATOR_API_URL= "https://api.sendmator.com/v1/send";
    private API_KEY="enter api key";
    
    async sendMfaToken(email: string,code:string){
        try{
            const response = await axios.post(
                this.SENDMATOR_API_URL,{
                    to: email,
                    subject: "Your MFA Verification Code",
                    text: `Your verification code is ${code}`,
                },
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${this.API_KEY}`,
                    },
                }
            );

            return response.data
        }catch (err){
            console.error("Sendmator Error", err.response?.data || err.message);
            throw new Error('Failed to send MFA email');
        }
    }
 }