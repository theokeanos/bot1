const Discord = require("discord.js");

exports.run = async(client, message, args, ayar, emoji) => {
 if (!message.member.roles.cache.has("802126801169022988") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).addField("Yetersiz Yetki",`Bu Komutu Kullanmak içi Yeterli Yetkiniz Yok`)).then(m => m.delete({timeout: 7000}));
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!victim || !reason) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription("banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!victim.kickable) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription("Botun yetkisi belirtilen üyeyi banlamaya yetmiyor!")).then(x => x.delete({timeout: 5000}));
  await victim.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  victim.ban({reason: reason}).catch();
  message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`\`${victim.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **banlandı!**`));
  client.channels.cache.get("802126803921010709").send(new Discord.MessageEmbed().setColor(0x00bfff).setDescription(`<@!${victim.user.id}> İsimli Kullanıcı Sunucudan Banlandı\n\n• Yetkili: <@!${message.author.id}> \`${message.author.id}\`\n• Banlanan Üye: <@!${victim.user.id}> \`${victim.user.id}\`\n\n• Sebep: **${reason}**`));
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ["ban","yasakla"]
    }
    
    exports.help = {
  name: "ban",
  usage: "ban [üye] [sebep]",
  description: "Belirtilen üyeyi sunucudan banlar."
    }
