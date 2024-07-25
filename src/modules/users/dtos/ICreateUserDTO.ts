import { DateTime } from "aws-sdk/clients/devicefarm";

interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  nascimento: Date;
}

export default ICreateUserDTO;
