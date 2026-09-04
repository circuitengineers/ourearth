export const seedStories = [
  {
    id: "seed-1",
    category: "drought",
    quote:
      "We used to get three harvests. Last year we got none. My father sold the goats to pay for water.",
    region: "East Africa",
    context: "Farming household",
  },
  {
    id: "seed-2",
    category: "flood",
    quote:
      "The river came into the kitchen for the third year running. We can't afford to rebuild again.",
    region: "South Asia",
    context: "Homeowner",
  },
  {
    id: "seed-3",
    category: "heat",
    quote:
      "My mother's fan stopped working during the heatwave. The nearest cooling center was ninety minutes away by bus.",
    region: "Southern Europe",
    context: "Caregiver",
  },
  {
    id: "seed-4",
    category: "fire",
    quote:
      "School was cancelled for two weeks because of the smoke. My son's asthma has never been the same.",
    region: "Pacific Northwest",
    context: "Parent",
  },
  {
    id: "seed-5",
    category: "storm",
    quote:
      "The roof held through two storms. It didn't hold through the third. Insurance called it 'an act of God.'",
    region: "Gulf Coast",
    context: "Small business owner",
  },
  {
    id: "seed-6",
    category: "flood",
    quote:
      "The cemetery is underwater at high tide now. We moved my grandmother's headstone inland last spring.",
    region: "Pacific Islands",
    context: "Community elder",
  },
];

export const categoryStyles = {
  drought: "bg-gold",
  flood: "bg-teal",
  heat: "bg-brick",
  storm: "bg-slate",
  fire: "bg-[#8C6A3F]",
};

export const categoryLabels = {
  drought: "Drought",
  flood: "Flooding",
  heat: "Heat",
  storm: "Storm damage",
  fire: "Wildfire smoke",
};
