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
    category: "sea_level",
    quote:
      "The cemetery is underwater at high tide now. We moved my grandmother's headstone inland last spring.",
    region: "Pacific Islands",
    context: "Community elder",
  },
];

// Preset categories. This list can keep growing — it's not meant to be
// exhaustive. "other" always stays last and lets someone describe an
// impact that doesn't fit any preset, so the option set is effectively
// open-ended rather than capped at whatever we thought to list.
export const categoryLabels = {
  drought: "Drought",
  flood: "Flooding",
  heat: "Heat",
  fire: "Wildfire smoke",
  storm: "Storm damage",
  sea_level: "Sea level rise",
  water_contamination: "Water contamination",
  crop_failure: "Crop failure",
  displacement: "Displacement / relocation",
  other: "Other",
};

export const categoryStyles = {
  drought: "bg-gold",
  flood: "bg-teal",
  heat: "bg-brick",
  fire: "bg-[#8C6A3F]",
  storm: "bg-slate",
  sea_level: "bg-[#2F6F73]",
  water_contamination: "bg-[#6E7B3F]",
  crop_failure: "bg-[#8A6D3B]",
  displacement: "bg-moss",
  other: "bg-ink-soft",
};
