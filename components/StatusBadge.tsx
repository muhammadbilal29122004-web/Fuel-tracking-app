import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: 'Pending' | 'In Transit' | 'Delivered';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
        'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
        'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };

    return (
        <span className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-300 inline-block',
            styles[status]
        )}>
            {status}
        </span>
    );
}
