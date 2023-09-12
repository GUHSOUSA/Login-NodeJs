const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcrypt"); // Adicionando bcrypt para hash de senha
const { genereToken } = require("../config/jwtToken");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação dos campos de entrada
    if (!name) {
      return res.status(400).json({ error: 'Por favor, forneça o nome de usuario' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Por favor, forneça o email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Por favor, forneça a senha' });
    }
   
   
    
    // Verificar se o email já está registrado
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Este email já está sendo usado por outra conta' });
    }

    
    
    // Criar o documento da usuario no banco de dados
    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json(newUser); // 201 Created para indicar sucesso na criação

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor' });
  }
});

const loginUser = asyncHandler(async (req, res ) => {
  try{
    const { password, email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Por favor, forneça o email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Por favor, forneça a senha' });
    }
    const findUser = await userModel.findOne({
      email: email
    });
    if (!findUser) {
      return res.status(400).json({ error: 'O email Não corresponde a nenhuma usuario' });
    }
    if(findUser && (await findUser.isPasswordMatched(password))){
      res.status(201).json({
        status: true,
        message: "Login feito com sucesso",
        token: genereToken(findUser?._id),
        usuario: findUser.usuario
      });

    }else {
      return res.status(400).json({ error: 'Senha incorreta' });
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor' });
  }
})

module.exports = { registerUser, loginUser };
