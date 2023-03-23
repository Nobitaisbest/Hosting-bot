const axios = require('axios');
const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
let key = process.env.KEY
module.exports = {
  name: 'createuser',
  description: 'Creates a new user',
  type: ApplicationCommandType.ChatInput,
   options: [
        {
            name: 'username',
            description: 'username to display on panel',
            type: ApplicationCommandOptionType.String,
          required: true
        },
        {
            name: 'email',
            description: 'email for the panel',
            type: ApplicationCommandOptionType.String,
           required: true
        },
        {
            name: 'password',
            description: 'What should be the password?',
            type: ApplicationCommandOptionType.String,
           required: true
        }
    ],
  run: async(client , interaction) =>{
     const username = interaction.options.getString('username');
    const email = interaction.options.getString('email');
    const password = interaction.options.getString('password');

    const user = {
      username,
      email,
      password,
      language: 'en',
      root_admin: false,
    };
const user2= {
  "username": "Nobita181818",
  "email": "nobita@gmail.com",
  "password": "123",
  "language": "en",
  "root_admin": false
}
console.log(key)
    try {
      const response = await axios.post('https://beast.protobot.cf/api/application/users', user, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
      });
      console.log(response.data);
 
      interaction.reply('User created successfully');
      interaction.user.send('User created successfully');
    } catch (error) {
      let err = new EmbedBuilder()
       .setAuthor({name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
      .setColor('NotQuiteBlack')
      .setDescription("there was an error creating your account")
      .setFooter({text: "Pls contact the developers about it as soon as you can"})
      console.error(error);
      interaction.reply({embeds: [err]});
       interaction.user.send('There was an error creating the user');
    }
  }
  };