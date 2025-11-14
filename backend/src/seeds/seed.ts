import { AppDataSource } from '../data-source';
import { User } from '../users/entities/user.entity';

async function seed() {
  await AppDataSource.initialize();
  console.log('Conectado a la base de datos');

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.count();
  if (existing > 0) {
    console.log('Ya existen usuarios, no se insertan datos.');
    return;
  }

  const users = userRepo.create([
    { name: 'Admin', email: 'admin@example.com' },
    { name: 'User', email: 'user@example.com' },
  ]);

  await userRepo.save(users);

  console.log('Datos iniciales insertados');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Error ejecutando seed:', err);
  process.exit(1);
});
