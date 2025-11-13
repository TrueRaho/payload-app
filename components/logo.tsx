import Image from 'next/image';

import type { ComponentProps } from 'react';

export function Logo({ className }: ComponentProps<'picture'>) {
  return (
    <picture className={className}>
      <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
      <Image
        alt="Payload Logo"
        height={65}
        src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
        width={65}
      />
    </picture>
  );
}