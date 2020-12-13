const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

   async run(client, message, args) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nope u cant use this")

    let reason = args.slice(1).join(" ");
    const mentioedmember = message.mentions.members.first();

    if(!reason) reason = "Banned";
    if(!args[0]) return message.channel.send("What shall i ban today");
    if(!mentioedmember) return message.channel.send("Hes not in here");

    const banembed = new Discord.MessageEmbed()
    .setTitle(`You have been banned from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setTimestamp()

    await mentioedmember.send(banembed)
    await mentioedmember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("Banned the user from the server"))
  }
}