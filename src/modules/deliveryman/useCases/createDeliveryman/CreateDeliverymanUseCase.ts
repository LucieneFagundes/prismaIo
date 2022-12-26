import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const clientAlreadyExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    if (clientAlreadyExists) {
      throw new Error("Username already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    });

    return client;
  }
}