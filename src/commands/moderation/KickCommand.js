const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

 async run(client, message, args) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have perms")
    const mentonedMember = message.mentions.members.first()
    let reason = args.slice(1).join(" ")
    const kickembed = new Discord.MessageEmbed()
      .setTitle("You been kicked from a server")
      .setDescription(`Reaseon ${reason}`)

    //kick @user dm ads
    if (!args[0]) return message.channel.send("Who should i kick?")
    if (!mentonedMember) return message.channel.send("Hes not in here")
    try {
      await mentonedMember.send(kickembed)

    } catch (err) {
      console.log(`Cant dm him`)
    }

    try {
      await mentonedMember.kick(reason)
    } catch (err) {
      console.log(err)
      message.channel.send("I cant kick him")
    }
  }
}