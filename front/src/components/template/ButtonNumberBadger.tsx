import { Button } from '@mantine/core';
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Icon, Number1, Number2, Number3, Number4, Number5, Number6, Number7, Number8, Number9, QuestionMark } from 'tabler-icons-react';
import { NB_IMAGE } from '../../services/Labels.services';

interface ButtonNumberBadgerProps {
    value: string;
    labelPriority: string[];
    setLabelPriority: Dispatch<SetStateAction<string[]>>;
}

const ICONS: Record<number, Icon> = {
    0: QuestionMark,
    1: Number1,
    2: Number2,
    3: Number3,
    4: Number4,
    5: Number5,
    6: Number6,
    7: Number7,
    8: Number8,
    9: Number9,
};

export function ButtonNumberBadger({ value, labelPriority, setLabelPriority }: ButtonNumberBadgerProps) {
    const [localPriority, setLocalPriority] = useState<number>(0);
    const [isDisabled, setDisabled] = useState(false);

    const onBtnClick = () => {
        if (isDisabled) {
            setLabelPriority((oldArray) => oldArray.filter((label) => label !== value));
        } else {
            setLabelPriority((oldArray) => [...oldArray, value]);
        }
    };

    useEffect(() => {
        const index = labelPriority.indexOf(value) + 1;
        setLocalPriority(index < 0 ? 0 : index % NB_IMAGE);
    }, [labelPriority, value]);
    useEffect(() => setDisabled(localPriority > 0), [localPriority]);

    const NumberIcon = useMemo(() => {
        const TmpIcon = ICONS[localPriority];
        return <TmpIcon />;
    }, [localPriority]);

    return (
        <Button leftIcon={NumberIcon} onClick={onBtnClick} variant="light" color={isDisabled ? 'teal' : 'blue'} size="sm" mr="sm" mb="sm">
            {value}
        </Button>
    );
}
