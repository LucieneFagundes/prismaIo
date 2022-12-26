import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthentucateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthentucateDeliveryman) {

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username:{
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (!deliveryman) {
      throw new Error("username or password invalid")
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("username or password invalid")
    }

    const token = sign({username}, "ef24c1394c43d49c0247c181e47645a3", {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token;
  }
}