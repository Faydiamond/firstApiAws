import z from 'zod'

const citySchema = z.object({
  city: z.string({
    invalid_type_error: 'City  must be a string',
    required_error: 'City is required.'
  })
})

export function validateCity(input) {
  return citySchema.safeParse(input)
}

export function validatePartialCity(input) {
  return citySchema.partial().safeParse(input)
}
