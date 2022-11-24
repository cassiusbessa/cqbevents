import { z } from 'zod';

export const IAttractionsZodSchema = z.object({
  title: z.string({ required_error: 'title is required',
    invalid_type_error: 'title must be a string' })
    .min(3, { message: 'title must be at least 3 characters' }),
  startDate: z.date({ required_error: 'startDate is required',
    invalid_type_error: 'startDate must be a date' }),
  endDate: z.date({ required_error: 'endDate is required',
    invalid_type_error: 'endDate must be a date' }),
  description: z.string().optional(),
  image: z.string().optional(),
  local: z.string().optional(),
});

export type IAttractions = z.infer<typeof IAttractionsZodSchema>;

// title Obrigatório. Título da atração
// startDate Obrigatório. Data de Início da atração
// endDate Obrigatório. Data de fim da atração
// description Livre descrição
// image Imagem da atração
// local Especificação interna do local, caso seja necessário