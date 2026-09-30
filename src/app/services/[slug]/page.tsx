import React from "react";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found | ÉLANE" };

  return {
    title: `${service.title} | ÉLANE Atelier Malta`,
    description: service.shortDesc,
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
