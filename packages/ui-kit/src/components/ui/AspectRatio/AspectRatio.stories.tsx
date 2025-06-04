import React from "react";
import type { Meta } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI Components/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The desired aspect ratio (width / height)",
    },
  },
};

export default meta;

export const Default = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&dpr=2&q=80"
          alt="Photo by Pawel Czerwinski"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&dpr=2&q=80"
          alt="Photo by Rui Silvestre"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const UltraWide = {
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={21 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&dpr=2&q=80"
          alt="Photo by David Marcu"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithVideo = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full rounded-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithContent = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={4 / 3} className="bg-muted rounded-md">
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 h-12 w-12 rounded-full bg-primary"></div>
          <h3 className="text-lg font-semibold">Content Card</h3>
          <p className="text-sm text-muted-foreground">
            This content maintains a 4:3 aspect ratio regardless of container
            width.
          </p>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const ResponsiveGrid = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
      {[
        {
          ratio: 16 / 9,
          title: "Landscape",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80",
        },
        {
          ratio: 1,
          title: "Square",
          image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&dpr=2&q=80",
        },
        {
          ratio: 3 / 4,
          title: "Portrait",
          image:
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&dpr=2&q=80",
        },
        {
          ratio: 16 / 9,
          title: "Wide",
          image:
            "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&dpr=2&q=80",
        },
        {
          ratio: 1,
          title: "Square",
          image:
            "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&dpr=2&q=80",
        },
        {
          ratio: 3 / 4,
          title: "Portrait",
          image:
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&dpr=2&q=80",
        },
      ].map((item, index) => (
        <div key={index} className="space-y-2">
          <AspectRatio ratio={item.ratio} className="bg-muted">
            <img
              src={item.image}
              alt={`${item.title} image`}
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
          <p className="text-sm font-medium text-center">{item.title}</p>
        </div>
      ))}
    </div>
  ),
};

export const CommonRatios = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">16:9 (Widescreen)</h3>
        <AspectRatio
          ratio={16 / 9}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
        >
          <div className="flex h-full w-full items-center justify-center text-white font-semibold">
            16:9 Aspect Ratio
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">4:3 (Traditional)</h3>
        <AspectRatio
          ratio={4 / 3}
          className="bg-gradient-to-r from-green-500 to-teal-600 rounded-md"
        >
          <div className="flex h-full w-full items-center justify-center text-white font-semibold">
            4:3 Aspect Ratio
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">1:1 (Square)</h3>
        <div className="w-1/2">
          <AspectRatio
            ratio={1}
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-md"
          >
            <div className="flex h-full w-full items-center justify-center text-white font-semibold">
              1:1 Aspect Ratio
            </div>
          </AspectRatio>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">21:9 (Ultra-wide)</h3>
        <AspectRatio
          ratio={21 / 9}
          className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-md"
        >
          <div className="flex h-full w-full items-center justify-center text-white font-semibold">
            21:9 Aspect Ratio
          </div>
        </AspectRatio>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">9:16 (Mobile Portrait)</h3>
        <div className="w-1/3">
          <AspectRatio
            ratio={9 / 16}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-md"
          >
            <div className="flex h-full w-full items-center justify-center text-white font-semibold text-center">
              9:16 Aspect Ratio
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  ),
};

export const ProductCards = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      {[
        {
          name: "Wireless Headphones",
          price: "$199",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&dpr=2&q=80",
        },
        {
          name: "Smart Watch",
          price: "$299",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&dpr=2&q=80",
        },
        {
          name: "Camera Lens",
          price: "$599",
          image:
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&dpr=2&q=80",
        },
        {
          name: "Laptop",
          price: "$1299",
          image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&dpr=2&q=80",
        },
      ].map((product, index) => (
        <div key={index} className="border rounded-lg overflow-hidden bg-card">
          <AspectRatio ratio={1} className="bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div className="p-4">
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-lg font-bold text-primary">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const MediaGallery = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <div className="grid grid-cols-2 gap-4">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
            alt="Mountain landscape"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&dpr=2&q=80"
            alt="Forest path"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <AspectRatio ratio={1} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&dpr=2&q=80"
            alt="Desert landscape"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        <AspectRatio ratio={1} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&dpr=2&q=80"
            alt="Mountain peak"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        <AspectRatio ratio={1} className="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&dpr=2&q=80"
            alt="Ocean waves"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <AspectRatio ratio={21 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&dpr=2&q=80"
          alt="Ocean panorama"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
