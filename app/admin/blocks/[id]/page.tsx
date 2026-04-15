'use client';

import { useState, useEffect, use } from 'react';
import { Loader2 } from 'lucide-react';
import BlockComposer from '@/components/blocks/BlockComposer';
import AdminAuthGate from '@/components/admin/AdminAuthGate';

function EditPageContent({ pageId }: { pageId: string }) {
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/blocks/${pageId}`);
        if (!res.ok) throw new Error('Page not found');
        const data = await res.json();
        setInitialData({
          ...data.page,
          tags: (data.page.tags || []).join(', '),
          blocks: data.page.blocks || [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-[#D97757] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-400 mb-4">{error}</p>
        <a href="/admin/blocks" className="btn btn-primary">Back to Pages</a>
      </div>
    );
  }

  return <BlockComposer initialData={initialData} pageId={pageId} />;
}

export default function EditBlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminAuthGate>
      <EditPageContent pageId={id} />
    </AdminAuthGate>
  );
}