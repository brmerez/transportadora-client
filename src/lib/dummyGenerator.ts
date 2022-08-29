import { faker } from "@faker-js/faker";

export function getRandomAddress() {
  return faker.address.streetAddress();
}
