import { UUID } from 'lib/types/core';

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 * 
 *  @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "phoneNumbers": []
 * }
 */
export interface User {
  id: UUID;
  /**
   * The email the user used to register his account
   */
  email: string;
  name: string;
  /**
   * @example "Happy"
   */
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
