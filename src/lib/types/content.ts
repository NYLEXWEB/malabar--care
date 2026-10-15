export interface CreateServiceInput {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageReference: string;
  features?: string[];
  displayOrder?: number;
  published?: boolean;
}

export type UpdateServiceInput = Partial<CreateServiceInput>;

export interface CreateVlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageReference: string;
  externalVideoUrl?: string;
  contentType?: "article" | "video";
  status?: "draft" | "published";
  publishedAt?: Date | string;
  readTimeMinutes?: number;
}

export type UpdateVlogInput = Partial<CreateVlogInput>;
