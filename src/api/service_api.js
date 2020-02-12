export const service = [
    {
        question: 'Your company will offer a : ',
        answer: [
            {
                title: 'Service ',
                value: 0
            },
            {
                title: 'Physical product ',
                value: 0
            },
            {
                title: 'Both',
                value: 0
            },
        ]
    },
    {
        question: 'Have you filed a patent for your service or product?',
        answer: [
            {
                title: 'Yes',
                value: 200
            },
            {
                title: 'no',
                value: 0
            }
        ]
    },
    {
        question: 'The business model of your service or product, does it offera recurring revenue?',
        answer: [
            {
                title: 'Yes',
                value: 300
            },
            {
                title: 'no',
                value: 0
            }
        ]
    },
    {
        question: 'Do you outsource all or part of the production to a supplier to create / offer your product or service?',
        answer: [
            {
                title: 'Yes',
                value: 0
            },
            {
                title: 'no',
                value: 300
            }
        ]
    },
    {
        question: 'If yes, do you have multiple suppliers available for your product or service?',
        answer: [
            {
                title: 'Yes',
                value: 300
            },
            {
                title: 'no',
                value: 0
            }
        ],
        dependencies: false,
    },
    {
        question: 'In what stage is your product or service?',
        answer: [
            {
                title: 'Being built',
                value: 60
            },
            {
                title: 'Available for sale',
                value: 240
            }
        ],
    },
    {
        question: 'Do you have for your product / service prototype / MVP?',
        answer: [
            {
                title: 'Yes',
                value: 300
            },
            {
                title: 'No',
                value: 0
            }
        ],
        dependencies: false,
    },


]