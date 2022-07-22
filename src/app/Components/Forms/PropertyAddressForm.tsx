import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import agent from '../../api/agent';
import { Wilaya, Daira, Commune } from '../../models/address';
import AutocompleteInput from './AutocompleteInput';
import TextInput from './TextInput';

type ListItem = { title: string; value: any };

export default function PropertyAddressForm() {
  const [wilayas, setWilayas] = useState<ListItem[]>([]);
  const [dairas, setDairas] = useState<ListItem[]>([]);
  const [communes, setCommunes] = useState<ListItem[]>([]);
  const { control } = useFormContext();

  const fetchWilayas = useCallback(async () => {
    const result = await agent.Address.listWilayas();
    setWilayas(
      result.map((wilaya: Wilaya) => ({
        title: wilaya.name,
        value: wilaya.id,
      }))
    );
  }, []);

  const fetchDairas = useCallback(async (wilayaId: string) => {
    const result = await agent.Address.listDairas(wilayaId);
    setDairas(
      result.map((daria: Daira) => ({ title: daria.name, value: daria.id }))
    );
  }, []);

  const fetchCommunes = useCallback(async (dairaId: string) => {
    const result = await agent.Address.listCommunes(dairaId);
    setCommunes(
      result.map((communes: Commune) => ({
        title: communes.name,
        value: communes.id,
      }))
    );
  }, []);

  useEffect(() => {
    if (wilayas.length <= 0) {
      fetchWilayas();
    }
  }, [fetchWilayas, wilayas.length]);

  const handleSelectWilaya = (item: any) => {
    fetchDairas(item.value);
  };

  const handleSelectDaira = (item: any) => {
    fetchCommunes(item.value);
  };

  return (
    <div className='grid grid-cols-1 gap-4'>
      <div className='grid lg:grid-cols-3 gap-4'>
        <AutocompleteInput
          control={control}
          label='Wilaya'
          items={wilayas}
          name={'address.wilaya'}
          handleSelect={handleSelectWilaya}
          returnTitle
        />

        <AutocompleteInput
          control={control}
          label='Daira'
          items={dairas}
          name={'address.daira'}
          handleSelect={handleSelectDaira}
          returnTitle
        />

        <AutocompleteInput
          control={control}
          label='Commune'
          items={communes}
          name={'address.commune'}
          returnTitle
        />
      </div>
      <TextInput
        autoComplete='adresse'
        type='text'
        control={control}
        name='address.address1'
        placeholder={'Adresse principale du bien'}
      />
      <TextInput
        autoComplete='address2'
        type='text'
        control={control}
        name='address.address2'
        placeholder={'Deuxième adresse (facultative)'}
      />
    </div>
  );
}
