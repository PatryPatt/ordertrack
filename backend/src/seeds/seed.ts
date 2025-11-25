import { SeedDataSource } from '../../config/data-source.seed';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';

async function runSeed() {
  try {
    console.log('Connecting to database...');
    await SeedDataSource.initialize();
    console.log('✅ Connected to database.');

     // Limpiar Orders primero
    console.log('Deleting existing orders...');
    const orderRepo = SeedDataSource.getRepository(Order);
    const deletedOrders = await orderRepo.createQueryBuilder().delete().execute(); // se borra primero order
    console.log(`Deleted ${deletedOrders.affected || 0} orders.`);

    // Limpiar Users después
    console.log('Deleting existing users...');
    const userRepo = SeedDataSource.getRepository(User);
    const deletedUsers = await userRepo.createQueryBuilder().delete().execute();
    console.log(`Deleted ${deletedUsers.affected || 0} users.`);

    // Crear usuario inicial
    const user = userRepo.create({
      name: 'Admin',
      email: 'admin@demo.com',
    });
    await userRepo.save(user);
    console.log('✅ User created:', user);

    await SeedDataSource.destroy(); // se ejecuta siempre incluso en caso de error
    console.log('✅ Seed completed successfully.');
  } catch (error) {
    console.error('❌ Error running seed:', error);
    await SeedDataSource.destroy();
    process.exit(1);
  }
}

runSeed();