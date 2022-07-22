import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import PropertyForm from '../../Components/Forms/PropertyForm';
import Layout from '../../layout/Layout';
import { Property } from '../../models/property';

export default function TestPage() {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchProperty = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      const result = await agent.Properties.details(slug);
      setProperty(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchProperty(slug);
    }
    return () => {
      setProperty(undefined);
    };
  }, [fetchProperty, slug]);

  if (loading && !property) return <LoadingComponent />;
  return (
    <Layout className='bg-gray-600 dark:bg-gray-900'>
      <div className='container mx-auto'>
        <PropertyForm property={property} />
      </div>
    </Layout>
  );
}
