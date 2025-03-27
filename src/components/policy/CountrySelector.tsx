
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { countries } from "@/lib/countries";

interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, setSelectedCountry }) => {
  return (
    <div className="mb-8">
      <label htmlFor="country-select" className="block text-sm font-medium text-neutral-700 mb-2">
        Select your country/region to see relevant policies:
      </label>
      <Select
        value={selectedCountry}
        onValueChange={(value) => setSelectedCountry(value)}
      >
        <SelectTrigger id="country-select" className="w-full md:w-72">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="mt-2 text-sm text-neutral-500">
        Showing policies applicable to {countries.find(c => c.code === selectedCountry)?.name || "United States"}
      </p>
    </div>
  );
};

export default CountrySelector;
