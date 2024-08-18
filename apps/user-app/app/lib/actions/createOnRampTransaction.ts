"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(provider:string,amount:number) {
    const session = await getServerSession(authOptions);
    if(!session.user || !session.user.id){
        return {message:"unauthenticated request"};
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data:{
            provider,
            token,
            amount:amount * 100,
            startTime:new Date(),
            userId:Number(session?.user?.id),
            status:"Processing"
        }
    })
    return {
        message:"done"
    }
}