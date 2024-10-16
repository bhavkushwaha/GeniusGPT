"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sam",
    avatar: "S",
    title: "Software Engineer",
    description: "This is the best AI tool I've used so far!",
  },
  {
    name: "Priya",
    avatar: "P",
    title: "Application Developer",
    description:
      "Now I don't have to use multiple LLMs, I have got all at one place.",
  },
  {
    name: "Daniel",
    avatar: "D",
    title: "Product Manager",
    description: "The models used give the most precise results.",
  },
  {
    name: "Yuki",
    avatar: "Y",
    title: "Consultant",
    description: "Best AI tool for my product research, simplistic UI!",
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
