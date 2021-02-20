const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { 
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmalısın!`));
  if (!args[0] || isNaN(args[0])) {
  const temizle = new Discord.MessageEmbed() 
  .addField("Hatalı Kullanım",`Örnek Kullanım: **${prefix}temizle 10**`)
  .setColor("RED")
  .setFooter("Okéanos 💖 Paradise")
  return message.channel.send(temizle)
  }
  message.delete();
  let sayi = Number(args[0]);
  let silinen = 0;
  for (var i = 0; i < (Math.floor(sayi/100)); i++) {
  message.channel.bulkDelete(100).then(r => silinen+=r.size);
  sayi = sayi-100; 
  };
  if (sayi > 0)  message.channel.bulkDelete(sayi).then(r => silinen+=r.size);
  const sil = new Discord.MessageEmbed()  
  .setColor("GREEN")
  .addField("İşlem Başarılı",`**\`\`${args[0]}\`\` Adet Mesaj Silindi.**`)
  .setFooter("Okéanos 💖 Paradise")
  return message.channel.send(sil)
  }

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['temizle','clear','purge','delete'],
    permLevel: 0,
}

exports.help = {
    name: 'sil', 
    description: 'Mesajları Siler',
    usage: 'sil'
}
