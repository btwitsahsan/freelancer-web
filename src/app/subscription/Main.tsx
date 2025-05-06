"use client";

import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

type Plan = {
  price: string;
  details: string;
  overview: string;
  features: string[];
};

const Main = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Basic Plan");

  const plans: Record<string, Plan> = {
    "Basic Plan": {
      price: "$49.99 / mo",
      details: "Billed Monthly",
      overview:
        "The Basic Plan is perfect for freelancers who are just starting out. It allows you to create a streamlined profile and showcase a limited portfolio, giving you a foothold in the freelancing world without overwhelming features. Track basic metrics like profile views and proposal acceptance rates, helping you understand your reach and impact.",
      features: [
        "Simple Profile Creation",
        "Limited Portfolio Features",
        "Basic Analytics (Profile Views, Proposal Acceptance Rates)",
        "Option to Upgrade for More Features",
      ],
    },
    "Professional Plan": {
      price: "$41.40 / mo",
      details: "$499.99 Billed yearly",
      overview:
        "For freelancers looking to expand their reach, the Professional Plan offers advanced tools to enhance visibility and engagement. Build a more comprehensive portfolio with added features, gain insights into how clients interact with your profile, and access in-depth analytics to help you make data-driven decisions for growth.",
      features: [
        "Advanced Portfolio Capabilities",
        "Enhanced Profile Visibility",
        "Detailed Analytics (Profile Interactions, Click-Through Rates)",
        "Flexible Subscription (Upgrade or Downgrade Options)",
      ],
    },
    "Premium Plan": {
      price: "$899.99",
      details: "1x Billed",
      overview:
        "The Premium Plan is designed for top-tier freelancers seeking maximum exposure and exclusive opportunities. Stand out with priority listing in search results, access to premium job postings, and advanced branding options. Enjoy enhanced customer support and comprehensive analytics to further elevate your freelance business.",
      features: [
        "Priority Search Result Listings",
        "Access to Exclusive Job Opportunities",
        "Comprehensive Portfolio Analytics",
        "Enhanced Branding Options",
        "Premium Customer Support",
      ],
    },
  };

  return (
    <div className="bg-gray100 px-10 py-8">
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-8 w-[60%]">
          <section>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Membership Pro</span>
              <span className="font-normal text-sm text-context">
                Your Subscription will begin today with a free 14-day trial
              </span>
            </div>
            <div className="flex w-full space-x-4 mt-4">
              {Object.keys(plans).map((plan) => (
                <PlanOption
                  key={plan}
                  title={plan}
                  price={plans[plan].price}
                  details={plans[plan].details}
                  isSelected={selectedPlan === plan}
                  onClick={() => setSelectedPlan(plan)}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Overview</span>
            <span className="font-normal text-sm text-gray500">
              {plans[selectedPlan].overview}
            </span>
          </section>

          <section className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Features</span>
            <div className="p-4 rounded-lg border border-gray300">
              <ul className="space-y-4 text-gray-700">
                {plans[selectedPlan].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="w-[40%]">
          <SummarySection />
        </div>
      </div>
    </div>
  );
};

interface PlanOptionProps {
  title: string;
  price: string;
  details: string;
  isSelected: boolean;
  onClick: () => void;
}

const PlanOption = ({
  title,
  price,
  details,
  isSelected,
  onClick,
}: PlanOptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 w-full cursor-pointer bg-white rounded-lg border ${
        isSelected ? "border-blue400 drop-shadow-lg" : "border-gray200"
      } hover:border-blue400 hover:ring hover:drop-shadow-lg flex flex-col items-start gap-4 transition-all`}
    >
      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={isSelected}
          className="form-radio text-blue500 w-6 h-6"
          readOnly
        />
        <span className="font-semibold text-lg text-black">{title}</span>
      </label>
      <hr className="w-full" />
      <div className="flex flex-col gap-1">
        <span className="text-md font-bold text-black">{price}</span>
        <span className="text-[14px] text-context">{details}</span>
      </div>
    </div>
  );
};

const SummarySection = () => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <div className="flex flex-col gap-8 bg-white -mt-24 px-8 py-10 rounded-2xl shadow">
      <div className="flex justify-between items-end">
        <span className="text-2xl font-bold">Summary</span>
        <span className="text-sm text-gray500">Starts on July 1, 2024</span>
      </div>
      <div className="flex flex-col gap-4">
        <SummaryItem label="Monthly" value="$49.99" />
        <SummaryItem label="Estimated Tax" value="$0.00" />
        <hr className="w-full border-t border-gray200 border-dashed my-2" />
        <SummaryItem label="Total after trial" value="$49.99" />
        <hr />
        <div>
          <label className="text-md font-semibold">Billing Address</label>
          <div className="mt-4">
            <div className="flex space-x-4 items-start">
              <div className="w-1/2">
                <label className="block text-context font-medium mb-1">
                  Country
                </label>
                <ReactFlagsSelect
                  selected={selectedCountry}
                  onSelect={(code) => setSelectedCountry(code)}
                  className="flag-selector"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-context font-medium mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="type here"
                  className="border px-3 py-2 rounded-lg w-full text-black border-gray200 placeholder-gray500 outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-context">
              *The brand is required by law to collect applicable transaction
              taxes for purchases made in certain tax jurisdictions.
            </p>
          </div>
        </div>
        <div className="border-t border-gray300 pt-4">
          <div className="flex justify-between items-center py-4">
            <h3 className="text-md font-semibold">Payment Method</h3>
            <button className="text-blue500 text-sm">+ Add new Card</button>
          </div>
          <div className="space-y-2 mt-2">
            <PaymentMethodCard
              name="Natasha Adaline"
              lastFour="8559"
              onclick={() => setSelectedCard(0)}
              isSelected={selectedCard === 0}
            />
            <PaymentMethodCard
              name="Natasha Adaline"
              lastFour="8559"
              onclick={() => setSelectedCard(1)}
              isSelected={selectedCard === 1}
            />
          </div>
        </div>
      </div>
      <button className="w-full py-3 bg-gradient-to-r from-blue500 to-pink-500 text-white font-semibold rounded-lg hover:drop-shadow-lg transition-all">
        Start Subscription
      </button>
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: string;
}

const SummaryItem = ({ label, value }: SummaryItemProps) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
};

interface PaymentMethodCardProps {
  name: string;
  lastFour: string;
  onclick: () => void;
  isSelected?: boolean;
}

function PaymentMethodCard({
  name,
  lastFour,
  onclick,
  isSelected,
}: PaymentMethodCardProps) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        isSelected ? "border-blue400" : "border-gray300"
      } hover:border-blue400 transition-all`}
      onClick={onclick}
    >
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="payment"
          className="text-blue500"
          defaultChecked={isSelected}
        />
        <div className="flex-grow">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray500">**** {lastFour}</p>
        </div>
      </label>
    </div>
  );
}

export default Main;
