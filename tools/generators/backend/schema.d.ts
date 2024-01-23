export interface Schema {
  interactive: boolean;
  url: string;
  input: string;
  fetch?: boolean;
  // added by the setup script
  output: string;
  entities: string;
  snapshots: string;
}
