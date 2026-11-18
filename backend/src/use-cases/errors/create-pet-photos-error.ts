export class CreatePetPhotosError extends Error {
  constructor() {
    super(
      'Error creating pet photos. Please ensure that you provide at least one photo and no more than five photos.',
    )
  }
}
