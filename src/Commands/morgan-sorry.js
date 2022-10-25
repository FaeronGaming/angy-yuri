const { SlashCommandBuilder } = require("@discordjs/builders");

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("morgan-sorry")
    .setDescription("Someone apologized for no reason?")
    .addNumberOption(option => option.setName('sorries')
      .setDescription("how many sorries were there (defaults to 1)")
    ),
  execute: async (interaction, client, prisma) => {
    const sorries = interaction.option.getNumber('sorries') || 1;
    const currentTip = await prisma.tip.findFirst();
    await prisma.tip.update({
      where: { id: currentTip.id },
      data: {
        value: { increment: (currentTip.increment * sorries) }
      }
    });
    const updatedTip = await prisma.tip.findFirst();
    await interaction.reply({ content: `That's another nickel. We're at \`${formatter.format(updatedTip.value)}\`` });
  }
};
