export interface Service {
    _id:                  string;
    name:                string;
    address:             string;
    banner_image:        string;
    card_image:          string;
    category:            string;
    city:                string;
    dates:               any[];
    description:         string;
    discount:            number;
    duration:            string;
    included:            string;
    not_included:        string;
    provider:            string;
    status:              boolean;
    favorite:            boolean;
    initPrice:           number;
    not_avatible:        boolean;
}

