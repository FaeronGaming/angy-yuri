const { SlashCommandBuilder } = require("@discordjs/builders");

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("morgan-sorry")
    .setDescription("Someone apologized for no reason?"),
  execute: async (interaction, client, prisma) => {
    const currentTip = await prisma.tip.findFirst();
    const newAmount = currentTip.value + currentTip.increment;
    await prisma.tip.update({
      where: { id: currentTip.id },
      data: {
        value: { set: newAmount }
      }
    });
    await interaction.reply({ content: `That's another nickel. We're at \`${formatter.format(newAmount)}\`` });
  }
};
