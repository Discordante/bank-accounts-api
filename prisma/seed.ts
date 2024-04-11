import { CardType, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const bank = await prisma.bank.create({
    data: {
      name: 'Banco Central',
    },
  });

  for (let i = 1; i <= 5; i++) {
    const account = await prisma.account.create({
      data: {
        iban: `ES982038577898300076023${i}`,
        balance: 1000.0 * i, 
        currency: 'EUR',
        bankId: bank.id,
      },
    });

    const saltOrRounds = 10;
    const pinHash = await bcrypt.hash('1234', saltOrRounds); 

    await prisma.card.create({
      data: {
        cardNumber: `1234 5678 9012 345${i}`,
        cardholderName: `Alice Wonderland ${i}`,
        expirationDate: new Date('2025-12-31T23:59:59.999Z'),
        cvv: 123,
        pinHash: pinHash,
        type: CardType.CREDIT,
        accountId: account.id,
        withdrawalLimit: 2000.0,
      },
    });

    await prisma.aTM.create({
      data: {
        name: `Sucursal ${i}`,
        bankId: bank.id,
      },
    });
  }

  console.log('Datos iniciales creados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
