export type ActivityItemProps {
    id: string;
    status: string;
    icon: string;
    'date and time': string;
    'sent amount'?: string;
    'exchange amount'?: string;
    'status color': string;
    type: string;
    'conversion rate'? : string;
    currency?: string;
    toggleBottomTab: () => void;
}