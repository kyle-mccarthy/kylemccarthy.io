import { TypeOrmModule } from '@nestjs/typeorm';

export function testConnection(entities: any[]) {
  return {
    entities,
    type: 'sqljs' as any,
    dropSchema: true,
    synchronize: true,
  };
}

export function moduleForRoot(entities: any[]) {
  return TypeOrmModule.forRoot(testConnection(entities));
}

export function moduleImports(entities: any[]) {
  return [
    TypeOrmModule.forRoot(testConnection(entities)),
    entities.map((entity) => TypeOrmModule.forFeature(entity)),
  ];
}
