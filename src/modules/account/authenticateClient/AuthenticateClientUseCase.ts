import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthentucateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthentucateClient) {

    const client = await prisma.clients.findFirst({
      where: {
        username:{
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if (!client) {
      throw new Error("username or password invalid")
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("username or password invalid")
    }

    const token = sign({username}, "77cc343f6cecd58f745b32bbbeda262e", {
      subject: client.id,
      expiresIn: '1d'
    })

    return token;
  }
}