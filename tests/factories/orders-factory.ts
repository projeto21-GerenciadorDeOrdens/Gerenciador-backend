import faker from "@faker-js/faker";
import { User } from "@prisma/client";

import { createUser } from "./users-factory";
import { prisma } from "@/config";

export async function generateDriver(user?: User) {
    
    return await prisma.drivers.create({
        data: {
            name: faker.name.findName(),
            plate: faker.vehicle.vrm()
        }
    })
    
}

export async function generateSender(){

    return await prisma.senders.create({
        data: {
            name: faker.company.companyName(),
            city: faker.address.city(),
            state: faker.address.stateAbbr()
        }
    })

}

export async function generateRecipient(){

    return await prisma.recipients.create({
        data: {
            name: faker.company.companyName(),
            city: faker.address.city(),
            state: faker.address.stateAbbr()
        }
    })

}

export async function generateOrderWithUnfinishedTrip(userId: number, senderId: number, recipientId: number, driverId: number){

    return await prisma.orders.create({
        data: {
            userId: userId,
            senderId: senderId,
            recipientId: recipientId,
            driverId: driverId,
            freight: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            weight: faker.datatype.float({ min: 10, max: 100, precision: 0.01 }).toString(),
            toll: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            taxes: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            advance: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            gas: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            cte: faker.datatype.number({ max: 100000 }).toString(),
            cteValue: faker.datatype.float({ min: 10, max: 50000, precision: 0.01 }).toString(),
            notes: faker.lorem.lines(),
            isPaid: false,
            driverFinishedService: false,
          },
    })

}

export async function generateOrderWithFinishedTrip(userId: number, senderId: number, recipientId: number, driverId: number){

    return await prisma.orders.create({
        data: {
            userId: userId,
            senderId: senderId,
            recipientId: recipientId,
            driverId: driverId,
            freight: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            weight: faker.datatype.float({ min: 10, max: 100, precision: 0.01 }).toString(),
            toll: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            taxes: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            advance: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            gas: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            cte: faker.datatype.number({ max: 100000 }).toString(),
            cteValue: faker.datatype.float({ min: 10, max: 50000, precision: 0.01 }).toString(),
            notes: faker.lorem.lines(),
            isPaid: false,
            driverFinishedService: true,
          },
    })

}

export async function generatePaidOrder(userId: number, senderId: number, recipientId: number, driverId: number){

    return await prisma.orders.create({
        data: {
            userId: userId,
            senderId: senderId,
            recipientId: recipientId,
            driverId: driverId,
            freight: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            weight: faker.datatype.float({ min: 10, max: 100, precision: 0.01 }).toString(),
            toll: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            taxes: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            advance: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            gas: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            cte: faker.datatype.number({ max: 100000 }).toString(),
            cteValue: faker.datatype.float({ min: 10, max: 50000, precision: 0.01 }).toString(),
            notes: faker.lorem.lines(),
            isPaid: true,
            driverFinishedService: faker.datatype.boolean(),
          },
    })

}

export async function generateNotPaidOrder(userId: number, senderId: number, recipientId: number, driverId: number){

    return await prisma.orders.create({
        data: {
            userId: userId,
            senderId: senderId,
            recipientId: recipientId,
            driverId: driverId,
            freight: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            weight: faker.datatype.float({ min: 10, max: 100, precision: 0.01 }).toString(),
            toll: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            taxes: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            advance: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            gas: faker.datatype.float({ min: 10, max: 100, precision: 0.1 }).toString(),
            cte: faker.datatype.number({ max: 100000 }).toString(),
            cteValue: faker.datatype.float({ min: 10, max: 50000, precision: 0.01 }).toString(),
            notes: faker.lorem.lines(),
            isPaid: false,
            driverFinishedService: faker.datatype.boolean(),
          },
    })

}