# Quasar App

> WIP

//This is an example layout for the builder object to save to files

Builder{
    name: 'Customer',
    signTypes: [
        { //sign
            type: 'Available',
            file: '~/Docs/Customer/Available.ai',
            variables: [
                phonenumber: '000.000.0000',
            ],
            previous: [111259, 113587],
        },
        {
            type: 'Sold',
            file: '~/Docs/Customer/Sold.ai',
            variables: null
            previous: [111260, 113586],
        },
    ],
    locations: [
        { //location
            subdivision: 'Corporate',
            address: '123 Street/rCity, TX',
            phone: '000.000.0000',
        },
        {
            subdivision: 'The Valley',
            address: '456 Boulevard/rTown, TX',
            phone: '123.456.7890',
            specific: true,
            signTypes: [
                { //sign
                    type: 'Available',
                    file: '~Docs/Customer/TheValley/Available.ai',
                    variables: [
                        phonenumber: '000.000.0000',
                        subCommunity: 'The Clavens',
                    ],
                    previous: [],
                },
            ],
        },
    ],
}