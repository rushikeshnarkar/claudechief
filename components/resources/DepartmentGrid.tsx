import Link from 'next/link';
import { DEPARTMENTS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function DepartmentGrid() {
  return (
    <section aria-label="Browse by department">
      <div className="grid-depts">
        {DEPARTMENTS.map((dept, index) => (
          <Link
            key={dept.slug}
            href={`/${dept.slug}`}
            className="card card-hover group animate-fadeUp"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-terra)] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {dept.count} resources
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-terra)] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* See All Button */}
      <div className="mt-6 text-center">
        <Link
          href="/departments"
          className="btn btn-ghost btn-sm inline-flex items-center gap-2"
        >
          See all departments
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}