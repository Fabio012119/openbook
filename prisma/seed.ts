import { PrismaClient, Role, BookingStatus } from '@prisma/client';
import { addMinutes } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.timeslot.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'hashed-password',
      role: Role.CUSTOMER,
    },
  });

  // Create a room
  const room = await prisma.room.create({
    data: {
      name: 'The Lost Tomb',
      description: 'An ancient tomb full of traps and mystery.',
      imageUrl: 'https://via.placeholder.com/400x300',
      maxPlayers: 6,
      durationMins: 60,
      pricePerPlayer: 18.5,
    },
  });

  // Create timeslots
  const now = new Date();
  const slot1Start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0);
  const slot2Start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0);

  const timeslot1 = await prisma.timeslot.create({
    data: {
      roomId: room.id,
      startTime: slot1Start,
      endTime: addMinutes(slot1Start, 60),
    },
  });

  const timeslot2 = await prisma.timeslot.create({
    data: {
      roomId: room.id,
      startTime: slot2Start,
      endTime: addMinutes(slot2Start, 60),
    },
  });

  // Create booking for the first timeslot
  await prisma.booking.create({
    data: {
      userId: user.id,
      timeslotId: timeslot1.id,
      numPlayers: 4,
      totalPrice: 74,
      status: BookingStatus.CONFIRMED,
    },
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
