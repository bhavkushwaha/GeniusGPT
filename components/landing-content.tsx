"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Bhav",
    avatar: "B",
    title: "Software Engineer",
    description: "This is the best AI tool I've used so far!",
  },
  {
    name: "Harshal",
    avatar: "H",
    title: "Application Developer",
    description: "This is the best AI tool I've used so far!",
  },
  {
    name: "Divy",
    avatar: "D",
    title: "Product Manager",
    description: "This is the best AI tool I've used so far!",
  },
  {
    name: "Sameer",
    avatar: "S",
    title: "Consultant",
    description: "This is the best AI tool I've used so far!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
