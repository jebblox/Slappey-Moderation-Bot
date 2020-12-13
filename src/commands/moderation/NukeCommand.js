const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run (client, message, args) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Nope")

    let reason = args.join(" ");
    const nukeChannel = message.channel;

    if(!reason) reason = "No reason";
    if(!nukeChannel.deletable) return message.channel.send("I cant nuke this chat");

     await nukeChannel.clone()
     await nukeChannel.delete();

  }
}