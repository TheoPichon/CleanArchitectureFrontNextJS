'use client';

import {
  Box,
  Grid,
  Typography,
  Button,
  FormLabel,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { useGuestsSection } from '@ratatouille/modules/order/react/sections/guest/use-guests-section';
import React from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGuestsSection();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Invités</Typography>

      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest) => (
          <Box key={guest.id}>
            <GuestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
              isOrganizer={guest.id === presenter.form.organizerId}
              changeOrganizer={presenter.changeOrganizer}
            />
          </Box>
        ))}
      </Grid>

      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        marginTop={2}
      >
        <Grid item>
          <Button variant="contained" onClick={presenter.addGuest}>
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={presenter.onNext}
            disabled={!presenter.isSubmittable}
          >
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GuestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  isOrganizer: boolean;
  onChange: <T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) => void;
  remove: (id: string) => void;
  changeOrganizer: (id: string) => void;
}> = ({
  id,
  firstName,
  lastName,
  age,
  isOrganizer,
  onChange,
  remove,
  changeOrganizer,
}) => {
  return (
    <Box>
      <Grid container direction={'row'} alignItems={'center'} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField
              value={firstName}
              onChange={(e) => onChange(id, 'firstName', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField
              value={lastName}
              onChange={(e) => onChange(id, 'lastName', e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField
              value={age}
              onChange={(e) => onChange(id, 'age', parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOrganizer}
                onChange={() => changeOrganizer(id)}
              />
            }
            label="Organisateur"
          />
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => remove(id)}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
