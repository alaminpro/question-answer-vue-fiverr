export const fundraising = [
  {
    id: 1,
    question: "Have you completed a previous fundraising?",
    answer: [
      {
        title: "yes",
        value: 300
      },
      {
        title: "no",
        value: 0
      }
    ]
  },
  {
    id: 2,
    question: "Total Amount previous fundraising",
    answer: [
      {
        title: "between 0 and 200 ",
        value: 16
      },
      {
        title: "201 and 500",
        value: 32
      },
      {
        title: "1 million to 5 million",
        value: 64
      },
      {
        title: "5 million to 30 million",
        value: 82
      },
      {
        title: "More than 30 million",
        value: 100
      }
    ],
    dependancies: false
  },
  {
    id: 3,
    question: "capital dilution related to previous fundraising",
    answer: [
      {
        title: "0-10%",
        value: 400
      },
      {
        title: "10-20%",
        value: 320
      },
      {
        title: "20-30%",
        value: 240
      },
      {
        title: "30-50%",
        value: 160
      },
      {
        title: "More than 50%",
        value: 80
      }
    ],
    dependancies: false
  },
  {
    id: 4,
    question: "What kind of fundraiser you want to achieve?",
    answer: [
      {
        title: "Seed",
        value: 0
      },
      {
        title: "A",
        value: 0
      },
      {
        title: "B",
        value: 0
      },
      {
        title: "C",
        value: 0
      }
    ]
  },
  {
    id: 5,
    question: "Desired amount to raise?",
    answer: [
      {
        title: "between 0 and 250",
        value: 200
      },
      {
        title: "251 and 750",
        value: 164
      },
      {
        title: "500 and 1 million",
        value: 128
      },
      {
        title: "1 million and 5 million",
        value: 96
      },
      {
        title: "5 million to 30 million",
        value: 64
      },
      {
        title: "More than 30 million ",
        value: 32
      }
    ]
  }
];
