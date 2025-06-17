
import React from 'react';
import { Activity } from '../types';
import { CheckCircleIcon } from './icons';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  return (
    <div className="py-5 px-6 bg-slate-50 rounded-lg shadow ring-1 ring-slate-900/5 mb-4">
      <h4 className="text-lg font-semibold text-slate-800 mb-2">{activity.title}</h4>
      <p className="text-slate-600 mb-3 text-sm leading-relaxed">{activity.details}</p>

      {activity.origin && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Origem:</span> {activity.origin}</p>
      )}
      {activity.keyQuestions && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Perguntas Chave:</span> {activity.keyQuestions}</p>
      )}
      {activity.considerations && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Considerações:</span> {activity.considerations}</p>
      )}
      {activity.examples && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Exemplos:</span> {activity.examples}</p>
      )}
      {activity.techniques && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Técnicas:</span> {activity.techniques}</p>
      )}
      {activity.focus && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Foco:</span> {activity.focus}</p>
      )}
       {activity.tools && (
        <p className="text-xs text-slate-500 mb-2 italic"><span className="font-semibold text-slate-600">Ferramentas:</span> {activity.tools}</p>
      )}

      {activity.categories && (
        <div className="mt-3 mb-3 p-3 bg-sky-50 rounded-md border border-sky-200">
          <h5 className="text-sm font-semibold text-sky-700 mb-1">Categorias de Requisitos:</h5>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li className="text-xs text-sky-600"><span className="font-medium">Funcionais (RF):</span> {activity.categories.functional}</li>
            <li className="text-xs text-sky-600"><span className="font-medium">Não Funcionais (RNF):</span> {activity.categories.nonFunctional}</li>
            <li className="text-xs text-sky-600"><span className="font-medium">De Negócio:</span> {activity.categories.business}</li>
            <li className="text-xs text-sky-600"><span className="font-medium">De Usuário:</span> {activity.categories.user}</li>
          </ul>
        </div>
      )}

      {activity.deliverables && activity.deliverables.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-slate-700 mb-2">Entregáveis:</h5>
          <ul className="space-y-1.5">
            {activity.deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start text-xs text-slate-600">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
